const express = require('express');
const maxmind = require('maxmind');
const moment = require('moment');
const cors = require('cors');
const morgan = require('morgan')
const path = require('path');
const app = express();
const currency = require('./data/currency.json');
const { connectDb } = require('./db');
const { donationController, contactController, getAllDoner } = require('./controller');

const asnDbPath = path.join(__dirname, './data/GeoLite2-ASN_20240921/GeoLite2-ASN.mmdb');
const countryDbPath = path.join(__dirname, './data/GeoLite2-Country_20240920/GeoLite2-Country.mmdb');
const cityDbPath = path.join(__dirname, './data/GeoLite2-City_20240920/GeoLite2-City.mmdb');

let asnLookup, countryLookup, cityLookup;

Promise.all([
    maxmind.open(asnDbPath).then((lookup) => {
        asnLookup = lookup;
        console.log('GeoLite2 ASN database loaded successfully.');
    }),
    maxmind.open(countryDbPath).then((lookup) => {
        countryLookup = lookup;
        console.log('GeoLite2 Country database loaded successfully.');
    }),
    maxmind.open(cityDbPath).then((lookup) => {
        cityLookup = lookup;
        console.log('GeoLite2 City database loaded successfully.');
    })
]).catch((err) => {
    console.error('Error loading databases:', err);
});

app.use(cors({
    origin: "*",
}));
app.use(express.json());
app.use(morgan('tiny'))


connectDb()

app.use((req, res, next) => {
    const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Normalize IPv6 address format
    const ipAddress = userIP.includes('::ffff:') ? userIP.split(':').reverse()[0] : userIP;

    // Perform lookup on all 3 databases (ASN, Country, City)
    const asnData = asnLookup ? asnLookup.get(ipAddress) : null;
    const countryData = countryLookup ? countryLookup.get(ipAddress) : null;
    const cityData = cityLookup ? cityLookup.get(ipAddress) : null;

    req.geoData = {
        asn: asnData,
        country: countryData,
        city: cityData,
        ip: ipAddress
    };
    next();
});

function keepServerAlive() {
    console.log('Keeping the server alive...');

    const serverStartDate = moment();

    const fetchActivationPatch = async () => {
        try {
            const response = await fetch('https://freeaipuse.onrender.com/activate');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            logServerUptime();

        } catch (error) {
            console.error('Error fetching activation patch:', error);
        }
    };

    const logServerUptime = () => {
        const now = moment();
        const duration = moment.duration(now.diff(serverStartDate));

        const years = duration.years();
        const months = duration.months();
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        console.log(`Server has been running for ${years} year(s), ${months} month(s), ${days} day(s), ${hours} hour(s), ${minutes} minute(s), and ${seconds} second(s)`);
    };

    setInterval(() => {
        fetchActivationPatch();
    }, 780000);
}



function isMobile(asn) {

    const mobileProviders = ['T-Mobile', 'Verizon', 'AT&T', 'Vodafone'];
    return mobileProviders.includes(asn ? asn.autonomous_system_organization : '');
}

// Function to check if the IP is a proxy
function isProxy(asn) {
    // Check for known proxy providers
    const proxyProviders = ['Proxy', 'Cloudflare', 'Amazon'];
    return proxyProviders.includes(asn ? asn.autonomous_system_organization : '');
}

// Function to check if the IP is a hosting provider
function isHosting(asn) {
    // Check for known hosting ASN or organizations
    const hostingProviders = ['DigitalOcean', 'Linode', 'Vultr'];
    return hostingProviders.includes(asn ? asn.autonomous_system_organization : '');
}

function getCurrencyByCountry(countryName) {
    const currencyInfo = currency.find(item => item.country === countryName);
    return currencyInfo ? { currency: currencyInfo.currency, code: currencyInfo.code } : null;
}

app.get('/activate', (req, res) => {

    res.json({
        data: 'success',
        message: "Activation patch successfully fetched"
    })

})

app.post('/donation', donationController)
app.post('/contact', contactController)
app.get('/alldoner', getAllDoner)


app.get('/', (req, res) => {
    const { asn, country, city, ip } = req.geoData;

    const currency = getCurrencyByCountry(country ? country.country.names.en : null);

    if (req.geoData) {
        res.json({
            ip: ip,
            // ASN Details
            asn: asn ? asn.autonomous_system_number : null,
            asnOrg: asn ? asn.autonomous_system_organization : null,
            isp: asn ? asn.isp : null,
            // Country Details
            continent: country && country.continent ? country.continent.names.en : null,
            continentCode: country && country.continent ? country.continent.code : null,
            country: country && country.country ? country.country.names.en : null,
            countryCode: country && country.country ? country.country.iso_code : null,
            // City Details
            region: city && city.subdivisions ? city.subdivisions[0].iso_code : null,
            regionName: city && city.subdivisions ? city.subdivisions[0].names.en : null,
            city: city && city.city ? city.city.names.en : null,
            district: city && city.most_specific_subdivision ? city.most_specific_subdivision.names.en : null,
            zip: city && city.postal ? city.postal.code : null,
            lat: city && city.location ? city.location.latitude : null,
            lon: city && city.location ? city.location.longitude : null,
            timezone: city && city.location ? city.location.time_zone : null,
            offset: city && city.location ? city.location.time_zone_offset : null,
            currency: currency ? currency.currency : null,
            isp: asn ? asn.isp : null,
            org: asn ? asn.organization : null,
            as: asn ? asn.autonomous_system_number : null,
            asname: asn ? asn.autonomous_system_organization : null,
            mobile: isMobile(asn),
            proxy: isProxy(asn),
            hosting: isHosting(asn)
        });
    } else {
        res.status(500).send('Unable to retrieve IP details.');
    }
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    keepServerAlive();
});
