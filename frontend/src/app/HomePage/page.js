import Link from "next/link";
import CopyButton from "../components/copybutton/page";

const HomePage = async () => {
  const res = await fetch('https://freeaipuse.onrender.com');

  if (!res.ok) {
    // Handle error case (optional)
    return <div>Error fetching data.</div>; // You can customize this message
  }

  const ipResponse = await res.json();

  return (
    <div className="p-6 bg-cyan-100 min-h-screen flex flex-col items-center">
      <div className="flex justify-center font-sans mb-4">
        <p className="text-8xl font-bold text-cyan-800">Welcome to AIP</p>
      </div>

      <p className="mt-10 text-center">
        You can copy and paste the following link for free use:
      </p>

      <div className="mt-5 bg-cyan-200 p-4 rounded w-full sm:w-3/4 md:w-1/2 lg:w-1/3 shadow-md flex justify-between items-center">
        <Link
          href="https://freeaipuse.onrender.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline break-all text-black"
        ><code>
            https://freeaipuse.onrender.com
          </code>

        </Link>
        {/* <CopyButton text="https://freeaipuse.onrender.com" /> */}
      </div>

      <p className="mt-4 text-center">
        For more information, you can check out the <Link href="/docs" className="text-cyan-800 hover:underline">documentation</Link> of this.
      </p>

      <div className="mt-6 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-lg font-semibold text-cyan-800">Example Response:</h2>
        <div className="relative mt-2">
          <div className="bg-cyan-200 p-4 rounded shadow-md overflow-x-auto">
            <pre className="text-sm sm:text-base whitespace-pre-wrap">
              {JSON.stringify(ipResponse, null, 2)}
            </pre>
          </div>
          <CopyButton text={JSON.stringify(ipResponse, null, 2)} />
        </div>
      </div>
    </div>


  );
};

export default HomePage;