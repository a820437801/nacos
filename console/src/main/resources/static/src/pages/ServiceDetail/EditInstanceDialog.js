import React from 'react';
import {Dialog, Form, Input, Switch} from '@alifd/next';
import {I18N, DIALOG_FORM_LAYOUT} from './constant'

const FormItem = Form.Item;

/*****************************此行为标记行, 请勿删和修改此行, 文件和组件依赖请写在此行上面, 主体代码请写在此行下面的class中*****************************/
class EditInstanceDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editInstance: {},
            editInstanceDialogVisible: false
        }
        this.show = this.show.bind(this)
    }

    show(editInstance) {
        const {metadata = {}} = editInstance
        if (!Object.keys(metadata).length) {
            editInstance.metadataText = Object.keys(metadata).map(k => `${k}=${metadata[k]}`).join(',')
        }
        this.setState({editInstance, editInstanceDialogVisible: true})
    }

    hide() {
        this.setState({editInstanceDialogVisible: false})
    }

    onConfirm() {
        console.log('confirm', this.props, this.state)
    }

    onChangeCluster(changeVal) {
        const {editInstance = {}} = this.state
        this.setState({
            editInstance: Object.assign({}, editInstance, changeVal)
        })
    }

    render() {
        const {editInstanceDialogVisible, editInstance} = this.state
        return (
            <Dialog
                className="instance-edit-dialog"
                title={I18N.UPDATE_INSTANCE}
                visible={editInstanceDialogVisible}
                onOk={() => this.onConfirm()}
                onCancel={() => this.hide()}
                onClose={() => this.hide()}
            >
                <Form {...DIALOG_FORM_LAYOUT}>
                    <FormItem label="IP:">
                        <p>1.1.1.1</p>
                    </FormItem>
                    <FormItem label={`${I18N.PORT}:`}>
                        <p>8080</p>
                    </FormItem>
                    <FormItem label={`${I18N.WEIGHT}:`}>
                        <Input
                            className="in-text"
                            value={editInstance.healthy}
                            onChange={healthy => this.onChangeCluster({healthy})}
                        />
                    </FormItem>
                    <FormItem label={`${I18N.WHETHER_ONLINE}:`}>
                        <Switch onChange={f => f}/>
                    </FormItem>
                    <FormItem label={`${I18N.METADATA}:`}>
                        <Input
                            className="in-text"
                            value={editInstance.metadataText}
                            onChange={metadataText => this.onChangeCluster({metadataText})}
                        />
                    </FormItem>
                </Form>
            </Dialog>
        )
    }
}

/*****************************此行为标记行, 请勿删和修改此行, 主体代码请写在此行上面的class中, 组件导出语句及其他信息请写在此行下面*****************************/
export default EditInstanceDialog;
