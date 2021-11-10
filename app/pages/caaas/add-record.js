import AddRecordView from '../../src/views/records/add_record';
import MainHeader from '../../src/components/mainHeader.component';

function AddRecord() {
    return (
        <div className="App">
            <MainHeader />
            <AddRecordView />
        </div>
    );
}

export default AddRecord;
