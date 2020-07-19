import React from 'react';
import { Modal } from 'antd';
import { Player } from '../../../../../models/Players/player';
import { observer } from 'mobx-react';

interface RoleModalProps {
    me: Player
    showModal: boolean
    toggleModal(): void 
}

const RoleModal = (props: RoleModalProps) => {
    let { me, showModal, toggleModal } = props

    return(
        <Modal
            title="Your role information"
            visible={showModal}
            centered
            onCancel={toggleModal}
            footer={null}
        >
            <h2>Your role is {me.roleName}</h2>
            {me.roleInfo.split('|').map((s: string, i: number) => (
                <h3 key={me.id + i}>{s}</h3>
            ))}
        </Modal>
    )
}

export default observer(RoleModal);