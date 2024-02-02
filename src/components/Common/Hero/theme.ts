import { CustomFlowbiteTheme } from "flowbite-react";

export const inputSearchTheme:CustomFlowbiteTheme['textInput'] = {
    base:'w-full rounded-3xl ',
    field:{
        input:{
            base: 'w-[100%] rounded-3xl h-12 px-4 text-sm border-2 px-10',
            sizes:{
                'sm':'h-8 px-3 text-xs',
                'md':'h-12 px-4 text-sm',
                'lg':'h-16 px-5 text-lg'
            },
            withAddon: {
                on: "pr-12 pl-5",
                off: "pr-4 pl-12"
            },
            colors:{
                'gray':'dark:bg-gray-50 dark:text-white border-gray-900  dark:border-gray-600 focus:ring-0 focus:ring-gray-500 focus:border-gray-500',
            },
            withShadow:{
                on: "shadow-md  dark:shadow-none",
                off: "shadow-none"
            }
        },
        
    }
}