import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { NameAtom } from "../store/atom/NameAtom";


export function Home() {

  const username  =  useRecoilValue(NameAtom)
    
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-amber-400">
        <div className="border-b-2 border-black flex flex-row justify-between px-24 py-2 font-semibold">
          <div className="text-4xl font-signature text-black my-2">
            Express
          </div>
          <div className="mt-4 flex flex-row space-x-8 font-normal ">
            {!username && <Link to={"/signin"}>Signin</Link> }
            
            <Link to={username?"/blogs":"/signup"}>
              <button
                type="button"
                className="focus:outline-none text-white bg-black focus:ring-4  font-medium rounded-full text-sm px-4 py-1 me-1 mb-1 mr-3 "
              >
                Get started
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col mt-20 px-24">
          <div className="font-medium font-heading text-9xl ">Stay curious.</div>
          <div className="text-2xl py-6 max-w-md text-neutral-700">
            Discover stories, thinking, and expertise from writers on any topic.
          </div>
         <Link to={username?"/blogs":"/signup"}>
            <button
              type="button"
              className="focus:outline-none text-white bg-black focus:ring-4  font-medium rounded-full text-sm px-12 py-4 me-8 mb-2 mr-3 "
            >
              Start Reading
            </button>
          </Link>
          
        </div>
      </div>
      <footer className="bg-white rounded-lg shadow m-4 ">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between ml-[40%]">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2024 <a href="https://thisshonrobert.netlify.app/" className="hover:underline">Thisshon™</a>. All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
