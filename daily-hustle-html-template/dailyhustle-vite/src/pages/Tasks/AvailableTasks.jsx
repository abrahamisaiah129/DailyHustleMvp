import React, { useState } from "react";
import tasks from "../../data/tasksData";
import JobRow from "../../components/JobRow";
import ModalJob from "../../components/ModalJob";

export default function AvailableTasks() {
    const [selected, setSelected] = useState(null);
    return (
        <>
            <h1 className="fw-bold text-primary mb-4">Find tasks</h1>
            <div className="filter-card mb-3 p-2 d-flex gap-2 align-items-center">
                <input
                    className="form-control form-control-sm"
                    placeholder="Search tasks..."
                />
            </div>
            <div className="tasks-table">
                {tasks.map((j) => (
                    <JobRow
                        key={j.id}
                        job={j}
                        onOpen={(id) => setSelected(j)}
                    />
                ))}
            </div>
            <ModalJob
                job={selected}
                onSubmit={() => setSelected(null)}
                show={!!selected}
            />
        </>
    );
}
