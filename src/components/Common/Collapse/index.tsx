
import { useEffect, useState } from "react";
import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";


interface Props {

    itemsOpen: number[];
    setItemsOpen: (e: number[]) => void;
    items: {
        title: string;
        content: string;
    }[];
    edit: boolean;


}

const Collapse = (props: Props) => {

    const [items, set_items] = useState(props.items);
    useEffect(() => {
        set_items(props.items);
    }, [props.items])



    const isVisibe = (index: number) => {
        
        return props.itemsOpen.includes(index);
    }



    const handleOpen = (index: number) => {
        let _items = [...props.itemsOpen];
        if (isVisibe(index)) {
            _items = _items.filter(x => x !== index);
        } else {
            _items.push(index);
        }
        props.setItemsOpen(_items);
    }

    return (
        <>
            {
                items.map((x,index) => (
                    <>
                        <article className="border-b" onClick={() => handleOpen(index)}>
                            <div className="border-l-2 border-transparent">
                                <header className="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none">
                                    <div className="text-grey-darkest font-thin text-xl" contentEditable={props.edit ? "true" : "false"} >
                                        {x.title}
                                    </div>
                                    <div className="rounded-full border border-grey w-7 h-7 flex items-center justify-center">
                                        
                                        {isVisibe(index) ? <FaCircleChevronDown /> : <FaCircleChevronUp />}

                                    </div>
                                </header>
                            </div>
                        </article>

                        <article className={"border-b transition duration-500 ease-in-out "+(isVisibe(index) ? "" : "hidden")}>
                            <div className="border-l-2 bg-grey-lightest border-indigo">
                                <header className="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none">
                                    <span className="text-indigo font-thin text-xl">
                                        
                                    </span>
                                    <div className="rounded-full border border-indigo w-7 h-7 flex items-center justify-center bg-indigo">
                                        <FaCircleChevronDown />

                                    </div>
                                </header>
                                <div>
                                    <div className="pal-8 pr-8 pb-5 text-grey-darkest">
                                        <ul className="pl-4" contentEditable={props.edit ? "true" : "false"}>
                                            {
                                                x.content.split('\n').map(x => (
                                                    <li className="text-grey-darkest font-thin text-xl">
                                                        {x}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </>

                ))
            }
        </>
    )
}

export default Collapse