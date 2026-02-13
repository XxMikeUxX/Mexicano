    import { Header } from "./components/Header";

    export const App = () => {
        return (
            <body className="text-zinc-800 text-base not-italic normal-nums font-normal accent-auto bg-no-repeat box-border caret-transparent block tracking-[0.56px] leading-6 list-outside list-disc pointer-events-auto text-start indent-[0px] normal-case visible border-separate font-ralewayx" >
                <div className="bg-no-repeat box-border caret-transparent">
                    <div className="bg-no-repeat box-border caret-transparent">
                        <div className="text-black bg-white bg-no-repeat box-border caret-transparent flex flex-col list-none min-h-[1000px] font-ralewayx">
                            <Header />
                        </div>
                    </div>
                </div>
                <div className="bg-no-repeat box-border caret-transparent"></div>
            </body>
        );
    }