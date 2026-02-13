    export const LanguageSelector = () => {
        return (
            <div className="relative bg-no-repeat box-border caret-transparent">
                <div className="relative items-center bg-white bg-no-repeat box-border caret-transparent flex flex-wrap justify-between -mt-0.5 border-b-black/30 border-b-2">
                    <div className="relative items-center bg-no-repeat box-border caret-transparent grid basis-[0%] grow flex-wrap overflow-hidden">
                        <div className="bg-no-repeat box-border caret-transparent col-end-3 col-start-1 row-end-2 row-start-1 max-w-full text-ellipsis text-nowrap overflow-hidden mx-0.5">
                            EN
                        </div>
                        <div className="bg-no-repeat box-border caret-transparent grid grow col-end-3 col-start-1 row-end-2 row-start-1 grid-cols-[0px_min-content] mx-0.5 py-0.5">
                            <input
                                type="text"
                                role="combobox"
                                value=""
                                className="bg-transparent box-border caret-transparent block col-start-2 row-start-1 tracking-[normal] min-w-0.5 w-full bg-[position:0px_50%] p-0"
                            />
                        </div>
                    </div>
                    <div className="items-center self-stretch bg-no-repeat box-border caret-transparent flex shrink-0">
                        <img
                        src="https://c.animaapp.com/mll9z4fjNI4ivk/assets/icon-1.svg"
                        alt="Icon"
                        className="bg-no-repeat box-border caret-transparent h-4 align-text-bottom w-4"
                        />
                    </div>
                </div>
            </div>
        );
    }      