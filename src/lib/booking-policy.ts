/** Hire duration is agreed per job; the owner confirmed no fixed minimum. */
export const bookingPolicy: { minimumHours: number | null } = { minimumHours: null };

export function minimumHireNote() {
  return bookingPolicy.minimumHours === null
    ? "Không có mức thuê tối thiểu cố định"
    : `Thuê tối thiểu ${bookingPolicy.minimumHours} giờ`;
}