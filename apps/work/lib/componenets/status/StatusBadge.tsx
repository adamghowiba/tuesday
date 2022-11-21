import { TextInput } from '@tuesday/ui';
import classNames from 'classnames';
import { FC, forwardRef } from 'react';

export interface StatusBadgeProps {
  label: string;
  color?: string;
  id: number;
  active?: boolean;
  isEditing?: boolean;
  onClickStatus: (params: { color: string; label: string; id: number }) => void;
}

const StatusBadge = forwardRef<HTMLDivElement, StatusBadgeProps>(({
  color,
  label,
  id,
  isEditing = true,
  ...props
}, ref) => {
  return (
    <>
      <div className="status-wrapper">
        {isEditing ? (
          <TextInput name={String(id)} size="small" fullWidth value={label} />
        ) : (
          <div
            className={classNames(
              'status',
              props.active && 'active',
              isEditing && 'editing'
            )}
            ref={ref}
            onClick={() => props.onClickStatus({ color, label, id })}
          >
            {label}
          </div>
        )}
      </div>

      <style jsx>{`
        .status-wrapper {
          width: 100%;
        }
        .status {
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--color-snow_white);
          font-weight: 500;
          width: 100%;
          padding: var(--space-xs) var(--space-small);
          background-color: ${color || '#C4C4C4'};
          cursor: pointer;
          transition: opacity var(--motion-productive-short)
            var(--motion-timing-enter);
          min-height: 32px;

          &:hover {
            opacity: 0.7;
          }

          &.active {
            border: 1px solid var(--primary-color);
          }

          &.editing {
            background-color: transparent;
            padding: 0;
          }
        }
      `}</style>
    </>
  );
});

StatusBadge.displayName = StatusBadge.name

export default StatusBadge;
