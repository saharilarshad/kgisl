import Link from "next/link"


const Navbar = () => {

    return (
        <div className="flex items-center justify-center gap-4 p-4">
            <Link href="/add">
                <div className='border-2 border-white rounded-md py-2 px-4 cursor-pointer'>ADD</div>
            </Link>

            <Link href="/edit">
                <div className='border-2 border-white rounded-md py-2 px-4 cursor-pointer'>EDIT</div>
            </Link>

            <Link href="/view">
                <div className='border-2 border-white rounded-md py-2 px-4 cursor-pointer'>VIEW</div>
            </Link>

            {/* <Link href="/profileuserapi">
                <div className='border-2 border-white rounded-md py-2 px-4 cursor-pointer'>Data KGISL</div>
            </Link> */}


        </div>
    )
}

export default Navbar