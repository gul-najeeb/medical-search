  import { FaRegCheckCircle } from "react-icons/fa";


const conditionData = [
  { id: 1, name: 'Diabetes' },
  { id: 2, name: 'Hypertension' },
  { id: 3, name: 'Asthma' },
  { id: 4, name: 'Heart Disease' },
  { id: 5, name: 'Chronic Kidney Disease' },
];

const ExistingConditionList = ({ selectedConditions, setSelectedConditions }) => {
  const toggleCondition = (id) => {
    setSelectedConditions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((conditionId) => conditionId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div style={styles.conditionList}>
      <h5>Select Existing Conditions:</h5>
      <div style={styles.conditionColumn}>
        {conditionData.map((condition) => (
          <div
            key={condition.id}
            onClick={() => toggleCondition(condition.id)}
            style={{
              ...styles.conditionItem,
              backgroundColor: selectedConditions.includes(condition.id) ? '#c8e6c9' : '#ffffff',
              opacity: selectedConditions.includes(condition.id) ? 0.7 : 1,
            }}
          >
             <div className="d-flex gap-2 align-items-center ">

{selectedConditions.includes(condition.id) && <FaRegCheckCircle />}

<span>{condition.name}</span>
</div>  
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  conditionList: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#e8f5e9',
  },
  conditionColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px',
  },
  conditionItem: {
    padding: '10px',
    border: '1px solid #388e3c',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export default ExistingConditionList;
