import PageHeader from "shared/PageHeader";
import Table from "shared/Table";
import EmptyBar from "shared/Table/tableEmptyState";

const MemberTask = () => {

  
  return (
    <>
      <div className='grid gap-y-4'>
        <PageHeader title="Member Task" />
        <Table
          tableHeads={[]}
          dataTableSource={[]}
          tableEmptyState={<EmptyBar componentType="task" />}
        />
      </div>
    </>
  );
};

export default MemberTask;
