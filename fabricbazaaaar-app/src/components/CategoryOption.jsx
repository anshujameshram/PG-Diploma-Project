import React, { useState } from 'react'

export default function CategoryOption({ category, subCategories, onSelectCategory}) {
    const [openCategory, setOpenCategory] = useState(null);
    // const [catChage, setCatChange] = useState(false);
    const toggleCategory = (category) => {
        setOpenCategory(openCategory === category ? null : category);
    };
    return (
        <><li key={category}>
            <div onClick={() => {toggleCategory(category)}}>
                {category}
                <img
                    src={`img/line-angle-${openCategory === category?"up":"down"}-icon.svg`}
                    className={`toggle-btn`}
                    alt=""
                />
            </div>
        
                <ul className={`sub-list ${openCategory === category ? 'open' : ''}`}>
                    {subCategories.map((subCategory) => (
                        <li key={subCategory} className="filterProduct" onClick={()=>{setOpenCategory(null);onSelectCategory(`${category}\t${subCategory}`);}}>
                            {subCategory}
                        </li>
                    ))}
                </ul>
        
        </li>
        </>
    )
}
