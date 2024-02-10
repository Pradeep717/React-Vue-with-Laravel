<template>
    <div class="container mt-5">
        <div class="card p-3">
            <div class="card-head">
                <h4>Add Student</h4>
            </div>
            <div class="card-body">
                <div v-if="errorList">
                    <div class="alert alert-danger" role="alert">
                        <ul>
                            <li v-for="(error, index) in errorList" :key="index">
                                {{ error[0] }}
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" v-model="model.student.name">
                </div>
                <div class="mb-3">
                    <label for="course" class="form-label">Course</label>
                    <input type="text" class="form-control" id="course" v-model="model.student.course">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" v-model="model.student.email">
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="text" class="form-control" id="phone" v-model="model.student.phone">
                </div>
                <button type="submit" @click="saveStudent" class="btn btn-primary">Save Student</button>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'studntCreate',
    data() {
        return {
            errorList: '',
            model: {
                student: {
                    name: '',
                    course: '',
                    phone: '',
                    email: ''
                }
            }
        }
    },
    methods: {
        saveStudent() {
            var mythis = this;
            axios.post(`http://127.0.0.1:8000/api/students`, this.model.student)
                .then(response => {
                    alert(response.data.message);
                    this.model.student = {
                        name: '',
                        course: '',
                        phone: '',
                        email: ''
                    }
                    this.errorList = '';
                })
                .catch(function (error) {
                    if (error.response) {

                        if (error.response.status === 422) {
                            console.log(error.response.data.errors);
                            mythis.errorList = error.response.data.errors;
                        }

                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                });
        }
    }

}
</script>

<style></style>