export default function Entity({entityName, entityHealth}){
    return (
        <section className="container">
            <h2>{entityName} health</h2>
            <div className="healthbar">
                <div className="healthbar__value" 
                style={{width: `${entityHealth}%`}}></div>
            </div>
        </section>
    );
};