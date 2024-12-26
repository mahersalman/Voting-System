
export default function Navbar() {
    return (
        <div
            className="w-full p-[10px] text-white flex justify-between items-center shadow-md fixed top-0 left-0 z-50"
            style={{
                background: "linear-gradient(to right, #003f8a, #0056b3)", 
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
            }}
        >
            <h1 className="text-4xl font-extrabold uppercase tracking-widest bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent shadow-md">
                Voting System
            </h1>
             <appkit-button />
        </div>
    );
}