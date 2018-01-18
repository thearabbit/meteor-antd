import _ from 'lodash';

export const ListView = (data) => {
    return (
        <ul>
            {data.map((val, key) => {
                <li><strong>{key}</strong> {val}</li>
            })}
        </ul>
    );
};
