import { useEffect, useState } from "react";
import { AppFooterMobile } from "./AppFooterMobile";
import { MenuSidebarFix } from "./MenuSidebarFix";

export function DynamicNavbar({}) {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
      window.addEventListener('resize', handleResize)
      handleResize()
  
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

    function handleResize() {
        if (window.innerWidth < 480) {
            setIsMobile(true)
          } else {
            setIsMobile(false)
          }
    }

    if (isMobile) return <AppFooterMobile />
    return <MenuSidebarFix />
    
    }
