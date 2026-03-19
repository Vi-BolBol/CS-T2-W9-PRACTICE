export default function Logs({logs}){
    return (
        <section className="container" id="log">
            <h2>Battle Log</h2>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>
                        <span className={log.isPlayer ? "log--player" : "log--monster"}>
                            {log.isPlayer ? "Player" : "Monster"}
                        </span>
                        <span>
                            {log.text}
                            <span className={log.isDamage ? "log--damage" : "log--heal"}>
                            {log.value}
                            </span>
                        </span>
                    </li>
                ))};
            </ul>
        </section>
    );
}