import { Icon } from '@iconify/react';
import { Button, Modal, ModalProps, Radio, TextInput } from '@tuesday/ui';
import Divider from '../../../componenets/global/Divider';
import React, { FC, useEffect } from 'react';
import lockClosed16Regular from '@iconify/icons-fluent/lock-closed-16-regular';
import shareAndroid24Regular from '@iconify/icons-fluent/share-android-24-regular';
import { useCreateBoardMutation } from '../../../api/hooks/board/board.mutate';
import { useForm } from '@felte/react';
import { z } from 'zod';
import { validator } from '@felte/validator-zod';
import { api } from '../../../api/api';

interface BoardModalProps {
  modalProps?: ModalProps;
  onExit: ModalProps['onExit'];
}

const BoardModalCreate: FC<BoardModalProps> = ({ modalProps, ...props }) => {
  const createBoardMutation = useCreateBoardMutation();

  const boardSchema = z.object({
    name: z.string().min(12, 'Board name is required'),
  });

  const handleCreateBoard = () => {
    // createBoardMutation.mutate();
  };

  const { form, errors, data } = useForm<z.infer<typeof boardSchema>>({
    onSubmit: async (values) => {
      const response = await api.board.create({ name: values.name });

      return response;
    },
    onSuccess: async (data) => {
      console.log('Success');
    },
    extend: validator({ schema: boardSchema }),
  });

  return (
    <>
      <Modal
        onExit={props.onExit}
        width={500}
        height="auto"
        actions={[
          <Button
            key="create"
            color="blue"
            buttonStyle="ghost"
            size="large"
            onClick={props.onExit}
          >
            Cancel
          </Button>,
          <Button
            key="fuck"
            color="blue"
            buttonStyle="filled"
            size="large"
            onClick={handleCreateBoard}
          >
            Create Board
          </Button>,
        ]}
        {...modalProps}
      >
        <h2>Create Board</h2>

        <form ref={form} className="modal-body">
          <TextInput
            placeholder="New Board"
            name="name"
            label="Board Name"
            error={errors().name}
          />

          <Radio.Group
            name="privacy"
            label="Board Privacy"
            helperText="Visible to everyone in your account"
            value="main"
            gridColumns={3}
          >
            <Radio value="main"> Main </Radio>

            <Radio value="private">
              <Icon icon={lockClosed16Regular} />
              <span>Private</span>
            </Radio>

            <Radio value="mark">
              <Icon icon={shareAndroid24Regular} />
              <span>Shareable</span>
            </Radio>
          </Radio.Group>

          <Divider margin="var(--space-small) 0" />

          <Radio.Group
            name="type"
            label={
              <h5 className="radio-group-title">
                Select what youre manging in this board
              </h5>
            }
            gridColumns={3}
            onChange={(value) => console.log(value)}
            value="items"
          >
            <Radio value="items"> Items </Radio>
            <Radio value="budgets">Budgets</Radio>
            <Radio value="employees">Employees</Radio>
            <Radio value="campaigns"> Campaigns </Radio>
            <Radio value="leads">Leads</Radio>
            <Radio value="projects">Projects</Radio>
            <Radio value="creatives">Creatives</Radio>
            <Radio value="clients">Clients</Radio>
            <Radio value="tasks">Tasks</Radio>
          </Radio.Group>

          <Button buttonType="submit">Submit</Button>
        </form>
      </Modal>
      <style jsx>{`
        .modal-body {
          display: flex;
          flex-direction: column;
          gap: var(--space-medium);
          margin-top: var(--space-medium);
        }

        .radio-group-title {
          line-height: var(--font-line-height-30);
          vertical-align: middle;
          margin: 0;
        }
      `}</style>
    </>
  );
};

BoardModalCreate.defaultProps = {};

export default BoardModalCreate;
