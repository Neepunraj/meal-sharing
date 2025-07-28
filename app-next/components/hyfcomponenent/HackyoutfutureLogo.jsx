import Image from 'next/image'
import React from 'react'
import HYFLogo from "@/assets/hyf.svg";

export default function HackyoutfutureLogo() {
    return (
        <>
            <a href="https://www.hackyourfuture.dk/" target="_blank" className="link">
                <Image src={HYFLogo.src} width={HYFLogo.width} height={HYFLogo.height} className="logo" alt="hackyour future logo" />
            </a>

        </>
    )
}
