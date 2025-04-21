import './Tabs.css';

export default function Tabs(){

    return (
        <div className="tabs">
            <button className="tab active" id="mgmt-tab">Question Management</button>
            <button className="tab" id="prv-tab">Question Preview</button>
        </div>
    );
}