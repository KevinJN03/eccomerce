function Size({ size }) {
    return (
        <section className="item-size-section">
            <div>
                <h3 className="section-title">Size</h3>
            </div>
            <div className="size-btn-wrapper">
                {size.map((item, index) => {
                    return (
                        // <div key={size.indexOf(item)} id="size-btn" value={item}>
                        //     {item}
                        // </div>
                        <input
                            className="item-size-btn"
                            key={index}
                            type="button"
                            value={item.size}
                        ></input>
                    );
                })}
            </div>
        </section>
    );
}

export default Size;
