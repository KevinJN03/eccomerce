import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const colorList = [
    { color: 'Red', id: uuidv4() },
    { color: 'Yellow', id: uuidv4() },
    { color: 'Blue', id: uuidv4() },
    { color: 'Green', id: uuidv4() },
    { color: 'Purple', id: uuidv4() },
    { color: 'Orange', id: uuidv4() },
    { color: 'Pink', id: uuidv4() },
    { color: 'Brown', id: uuidv4() },
    { color: 'Cyan', id: uuidv4() },
    { color: 'Magenta', id: uuidv4() },
];

function SelectVariation({ title }) {
    const [option, setOption] = useState([]);
    const [colors, setColors] = useState(colorList);

    const filterColor = (id) => {
        let newArr = [...colors];
        const newColor = newArr.filter((item) => item.id != id);

        setColors(newColor);
    };

    const addOption = (color) => {
        setOption([...option, color]);
        filterColor(color.id);
    };

    const deleteColor = (color) => {
        const newArr = [...option];
        const filterOption = newArr.filter((item) => item.id != color.id);
        setOption(filterOption);

        // if(newArr.find((item) => item.id == color.id) == false){
           setColors([color, ...colors]); 
        // }
        
    };

    const addremainingColors = () => {
        setOption([...option, ...colors])
        setColors([])
    }
    return (
        <section className="select-variation h-full w-full">
            <header className="flex w-full flex-col border-b-2 pb-10 !text-left">
                <h1 className="font-raleway font-semibold">{title} </h1>
                <p>Variation</p>
            </header>

            <section className="options mt-4">
                <div className="mb-6">
                    <h2 className="font-poppin text-lg font-semibold">
                        Options{' '}
                        <span className="rounded-full bg-black px-1 text-sm text-white">
                            {option.length}
                        </span>
                    </h2>
                    <p className="text-s">
                        Buyers can choose from the following options. Use the
                        options listed here for peak discoverability. Buyers
                        won’t see custom options in filters.
                    </p>
                </div>

                <section className="dropdown w-[300px]">
                    <div className="searchOption flex !w-full flex-row items-center">
                        <input
                            type="text"
                            className="input input-lg !w-full rounded-md"
                            placeholder="Enter an option..."
                            tabIndex={0}
                        />
                        <ArrowDropDownIcon className="absolute right-3" />
                    </div>

                    <div className="dropdown-menu dropdown-menu-bottom-center mt-2 max-h-[200px] w-full overflow-y-scroll p-0">
                        <ul>
                            {colors.map((item) => {
                            return (
                                <li
                                    className="flex flex-row flex-nowrap justify-between px-3 py-4 hover:bg-[var(--light-grey)]"
                                    onClick={() => addOption(item)}
                                >
                                    <p className="bg-transparent">{item.color}</p>
                                    <AddRoundedIcon className="bg-transparent" />
                                </li>
                            );
                        })} 

                        <li className=' px-3 py-4 hover:bg-[var(--light-grey)]' onClick={addremainingColors}>Add all options ({colors.length}) left</li>
                        </ul>
                       
                    </div>
                </section>

                <div className="options-wrapper mt-3">
                    {option.length > 0 &&
                        option.map((item) => {
                            const { color, id } = item;
                            return (
                                <div
                                    className="flex flex-row items-center justify-between"
                                    key={id}
                                >
                                    <span className="flex flex-row items-center gap-2">
                                        <MenuRoundedIcon fontSize="large" />
                                        <p>{color}</p>
                                    </span>
                                    <span className="p-3">
                                        <DeleteRoundedIcon
                                            onClick={() => deleteColor(item)}
                                        />
                                    </span>
                                </div>
                            );
                        })}
                        
                </div>
            </section>
        </section>
    );
}

export default SelectVariation;
