import { BlogsCard } from "../component/BlogsCard"
import { Navbar } from "../component/Navbar"

export const Blogs=()=>{
    return(
    <div>
        <div>
            <Navbar/>
        </div>
        <div className="flex flex-col justify-center pl-[25%]">
        <BlogsCard authorName="Thisshon Robert RS"
         title="How an Ugly Single-Page Website makes $5000 a Month with Affiliate Marketing" 
         content="The first use of Lorem ipsum is uncertain, though some have suggested the 1500s,
          when sections of Classical works were often used as dummy texts by printers to make type
           specimen books demonstrating different fonts. According to this account, the material was 
           sheets that featured the passage for use in the advertising industry. 
           The sheets allowed typesetters and designers to cut out and rub on the text
            in various fonts, sizes, and formats for mock-ups and prototypes." 
            publishedDate="Apr 12, 2024"/>
              <BlogsCard authorName="Thisshon Robert RS"
                title="How an Ugly Single-Page Website makes $5000 a Month with Affiliate Marketing" 
         content="The first use of Lorem ipsum is uncertain, though some have suggested the 1500s,
          when sections of Classical works were often used as dummy texts by printers to make type
           specimen books demonstrating different fonts. According to this account, the material was 
           sheets that featured the passage for use in the advertising industry. 
           The sheets allowed typesetters and designers to cut out and rub on the text
            in various fonts, sizes, and formats for mock-ups and prototypes." 
            publishedDate="Apr 12, 2024"/>
              <BlogsCard authorName="Thisshon Robert RS"
         title="How an Ugly Single-Page Website makes $5000 a Month with Affiliate Marketing" 
         content="The first use of Lorem ipsum is uncertain, though some have suggested the 1500s,
          when sections of Classical works were often used as dummy texts by printers to make type
           specimen books demonstrating different fonts. According to this account, the material was 
           sheets that featured the passage for use in the advertising industry. 
           The sheets allowed typesetters and designers to cut out and rub on the text
            in various fonts, sizes, and formats for mock-ups and prototypes." 
            publishedDate="Apr 12, 2024"/>
         </div>
    </div>  
    )
}