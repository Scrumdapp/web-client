export default function AttendanceTextArea({comment} : {comment ?: string | null}) {
    return (
        <div className="mt-1">
            <textarea className="write-section-attendance" placeholder="Notes...">{comment}</textarea>
        </div>
    )
}