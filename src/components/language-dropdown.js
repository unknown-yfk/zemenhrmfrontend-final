import { Button, Select } from "antd"
import {  useTranslation } from "react-i18next";
const Languageoption = (props)  => {
	const {t} = useTranslation();

    return (

        <button>

       
        <div className="w-15 text-center gap-4">
        <select onChange={props.onChange}  class="drop-shadow-sm appearance-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
            <option >  
                {t('language')}</option>
            <option value={'en'}> {t('english')}</option>
            <option value={'am'}> {t('amharic')}</option>
            {/* <option value={'om'}> {t('oromifa')}</option>
            <option value={'ti'}> {t('tigrinya')}</option> */}
        </select>
       
                      
        </div>
        </button>

    )

}

export default Languageoption;