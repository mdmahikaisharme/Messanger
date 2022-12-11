import styles from "@styles/components/home/ResultList.module.scss";

export default function ResultList({
    result,
    onAdd,
}: {
    result: any[];
    onAdd: (member: any) => void;
}) {
    return (
        <div className={`${styles.resultList} scrollY`}>
            {!result.length && (
                <div className="py-4 text-center text-gray-500">
                    Noting to show
                </div>
            )}

            {result.map((member) => (
                <div className={styles.resultItem} key={member._id}>
                    <div className={styles.resultItemImage}></div>
                    <h3 className={styles.resultItemName}>{member.name}</h3>
                    <button
                        className={styles.resultItemButton}
                        onClick={() => onAdd(member)}
                    >
                        Add
                    </button>
                </div>
            ))}
        </div>
    );
}
