

import LanguageSwitcher from "@/components/languageSwitcher/Switch"
import Link from "next/link"

const TopBar = () => {
  return (
    <div className="flex items-center justify-center mx-auto p-3 border-b-2 border-white gap-5">
      <Link href="/">
        <h1>KGISL Test</h1>
      </Link>
      <LanguageSwitcher />
    </div>
  )
}

export default TopBar