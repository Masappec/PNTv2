import { TabsProps } from "flowbite-react";


export const themeTabs: TabsProps['theme'] = {
    base: 'tabs',
    tablist:{
        base: '-mb-px flex flex-wrap text-center text-sm font-medium',
        tabitem:{
            styles:{
                underline:{
                    base:'',
                    active:{
                        on: 'text-primary bg-primary/10 border-b border-primary rounded-t-md focus:ring-0',
                        off: 'border-transparent text-gray-600 border-gray-300 rounded-t-md focus:ring-0 hover:bg-gray-200'
                    }
                }
            }
        }
    }
}