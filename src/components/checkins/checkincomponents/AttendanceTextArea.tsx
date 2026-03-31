type Props = {
    value?: string | null;
    onChange?: (value: string) => void;
};

export default function AttendanceTextArea({ value, onChange }: Props) {
    return (
        <div className="mt-1">
            <textarea
                className="write-section-attendance"
                placeholder="Notes..."
                value={value ?? ""}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </div>
    );
}