import React, { useState } from 'react';


const Create: React.FC = () => {
    const [pollID, setPollID] = useState('');
    const [name, setName] = useState('');
    const [apeError, setApiError] = useState('');




    return (<div className="flex flex-col w-full justify-around items-stretch h-full mx-auto max-w-sm">
        <h3 className="text-center">Enter Code Provided by &quot;Friend&quot;</h3>
    </div>
    );
}

export default Create; 