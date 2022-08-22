export default function ItemCard() {
    return (
        <div className="bg-white border-gray-300  border-0.5 md-w-1/2 h-23 px-5 flex justify-center" style={{'flex-direction': 'column'}} >
            <div className="flex justify-between">
                <div className="flex items-center">
                    <p className="text-4.5 mr-3" >Git Operations</p>
                    <img src="https://github.githubassets.com/favicons/favicon.svg" className="w-4 h-4" />

                </div>
                <div className="">
                    <img src="https://github.githubassets.com/favicons/favicon.svg" className="w-6 h-6" />
                </div>
            </div>
            <p className="text-sm text-gray-500">Normal</p>

        </div>
    );

}