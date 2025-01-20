
const enabled = true;
const text = 'A button';
const placeholder = 'input value....';
const size =50;
const array = ["First", "Second", "Third"];

const object = {
    first: 1,
    second: 2,
    third: 3
};


const appState ={
    text: "My Button",
    disabled: true,
    items: ["First", "Second", "Third"],
};

const handleClick = () => {
    console.log('Button was clicked!');
}

const Intro = () => {
    return (
       <section>
        <h1>Array</h1>
    <ul>
    {array.map((i) => (
        <li key={i}>{i}</li>
    ))}
    </ul>

    <h1>Object</h1>
    <ul>
        {Object.keys(object).map((i) => (
            <li key={i}>
                <strong>{i}: </strong>
                {object[i]}
                </li>
        ))}
    </ul>
            <button onClick={handleClick} disabled={!enabled}>{text}</button>
            <input placeholder={placeholder} size={size}/>
       </section>
    )
}

export default Intro
