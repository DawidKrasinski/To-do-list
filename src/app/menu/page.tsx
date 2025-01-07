import Image from "next/image"
import { Header } from "../components/header/header-component"

export default function Menu () {
    // function Theme (){
    //     return (
    //         <div className="flex flex-1 flex-col gap-4">
    //                 <div className={`${isActive ? "border-purple-400" : "border-transparent"} border-2`}></div>
    //             </div>
    //     )
    // }

    return(
        <div className="flex flex-col gap-16 pt-16 px-4">
            <div className="flex flex-col gap-8">
            <Header header="Settings"/>
            <Image src={""} height={100} width={100} alt={""} className="flex justify-center"/>
            <input value={"name"} type="text" className="bg-muted p-3 rounded-lg"></input>
            </div>
            <div className="flex gap-8">
                {/* <Theme theme=""/> */}
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-4">
                <button className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-3 w-full">
                    Save Changes
                </button>
            </div>
        </div>
    )
}