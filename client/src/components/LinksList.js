import { Link } from "react-router-dom";

export const LinksList = ({list}) => {
    if( !list.length) {
        return <p className="center">Ссыылок нет</p>

    }

    return (

        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Исходная</th>
                <th>Сокращенная</th>
                <th>открыть</th>
            </tr>
            </thead>

            <tbody>
            {list.map((link, index) => (
                <tr key={link.to}>
                    <td>{index + 1}</td>
                    <td>{link.from}</td>
                    <td>{link.to}</td>
                    <td>
                        <Link to={`/detail/${link._id}`}>Open</Link>
                    </td>
                </tr>
            ))}


            </tbody>
        </table>
    )
}