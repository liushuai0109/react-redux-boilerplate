import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Col, Breadcrumb, Button} from 'react-bootstrap';
import axios from 'axios';


export default class NewItem extends Component {
    render() {
        return (
            <div className="component-new-item">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        项目
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        创建新项目
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass="label" sm={2}>名称</Col>
                        <Col sm={10}>
                            <FormControl componentClass="input" type="text"></FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass="label" sm={2}>URL</Col>
                        <Col sm={10}>
                            <FormControl componentClass="input" type="text"></FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass="label" sm={2}>渠道</Col>
                        <Col sm={10}>
                            <FormControl componentClass="select">
                                <option value={1}>渠道1</option>
                                <option value={2}>渠道2</option>
                                <option value={3}>渠道3</option>
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass="label" sm={2}>渠道类型</Col>
                        <Col sm={10}>
                            <FormControl componentClass="select">
                                <option value={0}>未分类</option>
                                <option value={1}>类型1</option>
                                <option value={2}>类型2</option>
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Button bsStyle="primary" onClick={this.submit}>生成二维码</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    submit() {
        axios.get(`http://qr-code-machine.localhost:8888/api/qr/1`).then(function () {
            console.log('say something');
        }).catch(function (thrown) {
            console.log(thrown.message);
        })
    }
}
