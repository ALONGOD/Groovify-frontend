import { useEffect, useState } from "react";
import { AppFooterMobile } from "./AppFooterMobile";
import { MenuSidebarFix } from "./MenuSidebarFix";
import { useDispatch, useSelector } from "react-redux";
import { SET_IS_MOBILE } from "../../store/reducers/system.reducer";

export function DynamicNavbar({}) {
  const dispatch = useDispatch()
    const isMobile = useSelector(state => state.systemModule.isMobile)
    
    useEffect(() => {
      window.addEventListener('resize', handleResize)
      handleResize()
  
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

    function handleResize() {
        if (window.innerWidth < 480) {
            dispatch({ type: SET_IS_MOBILE, isMobile: true })
          } else {
            dispatch({ type: SET_IS_MOBILE, isMobile: false })
          }
    }

    if (isMobile) return <AppFooterMobile />
    return <MenuSidebarFix />
    
    }
