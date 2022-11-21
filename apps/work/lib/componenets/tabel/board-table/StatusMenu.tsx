import { BoardApi } from '@tuesday/types';
import { Box, Button, MenuV2, Stack } from '@tuesday/ui';
import { FC, FormEvent, useRef, useState } from 'react';
import { api } from '../../../../lib/api/api';
import StatusBadge, { StatusBadgeProps } from '../../status/StatusBadge';

export interface StatusMenuProps {
  activeStatusId: number;
  statusList: BoardApi.GetResponseBody['statuses'];
  onClickStats: StatusBadgeProps['onClickStatus'];
  onEditLabels: (labels) => void;
}

const StatusMenu: FC<StatusMenuProps> = (props) => {
  const statusRef = useRef<HTMLDivElement>(null);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const inputs = target.querySelectorAll('input');

    const stauses = Array.from(inputs).map((input) => ({
      id: +input.name,
      label: input.value,
    }));

    const response = await api.statuses.updateMany({
      data: stauses,
    });

    console.log(response);
    setIsStatusMenuOpen(false);
    setIsEditing(false);
  };

  const handleStatusClick = (event) => {
    if (props.onClickStats) props.onClickStats(event);
  }

  const handleMenuClose = () => {
    setIsStatusMenuOpen(false);
    setIsEditing(false);
  };

  const activeStatus = props.statusList.find(
    (status) => status.id === props.activeStatusId
  );

  return (
    <>
      <StatusBadge
        isEditing={false}
        color={activeStatus?.color}
        label={activeStatus?.label}
        id={activeStatus?.id}
        ref={statusRef}
        onClickStatus={() => setIsStatusMenuOpen((open) => !open)}
      />

      <MenuV2
        anchorEl={statusRef.current}
        isOpen={isStatusMenuOpen}
        onClose={handleMenuClose}
        sx={{
          padding: 'var(--space-medium)',
          paddingBottom: 0,
        }}
        closeOnClick={false}
        width={190}
        placement="bottom"
      >
        <form onSubmit={handleSubmit}>
          <MenuV2.Group>
            <Stack direction="column" w="100%" gap="var(--space-xs)">
              {props.statusList.map((status) => (
                <StatusBadge
                  id={status.id}
                  onClickStatus={handleStatusClick}
                  label={status.label}
                  color={status.color}
                  key={status.id}
                  isEditing={isEditing}
                />
              ))}

              {isEditing && (
                <Button textAlign="center" buttonStyle="outlined">
                  Add Label
                </Button>
              )}
            </Stack>
          </MenuV2.Group>

          <Box py="var(--space-small)">
            {isEditing ? (
              <Button key="apply" textAlign="center" buttonType="submit">
                Apply
              </Button>
            ) : (
              <Button
                key="edit"
                buttonType="button"
                textAlign="center"
                onClick={() => setIsEditing(true)}
              >
                Edit label
              </Button>
            )}
          </Box>
        </form>
      </MenuV2>

      <style jsx>{`
        form {
          width: 100%;
        }
        .status {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-snow_white);
          font-weight: 500;
          cursor: pointer;
        }

        .status-list {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: var(--space-small);
        }
      `}</style>
    </>
  );
};

StatusMenu.defaultProps = {};

export default StatusMenu;
