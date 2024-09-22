"use client"; 

const CopyButton = ({ text }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard!");
        });
    };

    return (
        <span className="bg-cyan-100  text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-cyan-700  border border-cyan-500 absolute top-2 right-2 text-white p-2 rounded cursor-pointer" onClick={copyToClipboard}> Copy</span>
    );
};

export default CopyButton;
