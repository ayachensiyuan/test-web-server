export default function StatusCard() {
    return (
        <div className="bg-green-600 rounded-md relative md-top--6">
            <div className="flex md-h-13 h-10 flex items-center text-white">
                {/* icon */}
                <div className="mx-5 flex justify-center items-center">
                    <img src="https://github.githubassets.com/favicons/favicon-dark.svg" className="w-6 h-6" />
                </div>
                <p className="text-xl font-bold">All Systems Operational</p>

            </div>
        </div>
    );
}
