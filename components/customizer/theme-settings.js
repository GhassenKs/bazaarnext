import React, {useEffect ,useState, useContext} from 'react';
import SettingContext from '../../helpers/theme-setting/SettingContext';
import {SlideUpDown} from "../../services/script"
import { ToastContainer } from 'react-toastify';
import {config} from './config.json'
import { Media, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ThemeSettings = () => {
    const context = useContext(SettingContext)
    const [themeLayout, setThemeLayout] = useState(false);
    const layoutType = context.layoutFun;
    const layoutColorFunc = context.layoutColorFun
    const layoutState = context.state
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
  
    /*=====================
     Tap on Top
     ==========================*/
     useEffect(() => {

        if(config.layout_version && config.layout_type){
            document.body.className = `${config.layout_version}  ${config.layout_type}`
        }

        if(localStorage.getItem("color")){
            document.documentElement.style.setProperty('--theme-deafult', localStorage.getItem("color"));
        }
        
        window.addEventListener('scroll', handleScroll);
        SlideUpDown('setting-title');
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

     }, []);
   
    const handleScroll = () => {
        if (process.browser) {
        if (document.documentElement.scrollTop > 600) {
            document.querySelector(".tap-top").style = "display: block";
        } else {
            document.querySelector(".tap-top").style = "display: none";
        }
        }
    }

    const openSetting = () => {
        if (process.browser) {
        document.getElementById("setting_box").classList.add('open-setting');
        document.getElementById("setting-icon").classList.add('open-icon');
        }
    }

    const closeSetting = () => {
        if (process.browser) {
        document.getElementById("setting_box").classList.remove('open-setting');
        document.getElementById("setting-icon").classList.remove('open-icon');
        }
    }


    const changeThemeLayout = () => {
        setThemeLayout(!themeLayout)
    }

    if(themeLayout){
        if (process.browser) {
        document.body.classList.add('dark');
        config.layout_version = 'dark'
        }
    }else{
        if (process.browser) {
        document.body.classList.remove('dark');
        config.layout_version = 'light'
        }
    }

    return (
        <div>
            
           
        </div>
    );

}

export default ThemeSettings;
