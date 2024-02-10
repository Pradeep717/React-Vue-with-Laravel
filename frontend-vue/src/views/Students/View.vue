<template>
    <div class="card container mt-5">
        <div class="card-header">
            <h4>Student List
                <RouterLink to="/students/create" class="btn btn-primary float-end">
                    Add Student
                </RouterLink>
            </h4>
        </div>
        <div class="card-body">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Reg No.</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Edit</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody v-if="this.students.length > 0">
                    <tr v-for="(student, index) in this.students" :key="index">
                        <td>{{ student.id }}</td>
                        <td>{{ student.name }}</td>
                        <td>{{ student.course }}</td>
                        <td>{{ student.email }}</td>
                        <td>{{ student.phone }}</td>
                        <td>
                            <RouterLink :to="'/students/' + student.id + '/edit'" class="btn btn-success">
                                Edit
                            </RouterLink>
                        </td>
                        <td>
                            <button @click="deleteStudent(student.id)" type="button" class="btn btn-danger"
                                :disabled="deleting.includes(student.id)">
                                <span v-if="deleting.includes(student.id)">Deleting...</span>
                                <span v-else>Delete</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="7" class="text-center">Loading...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'students',
    data() {
        return {
            students: [],
            deleting: []
        }
    },

    mounted() {
        this.getStudents()
    },

    methods: {
        getStudents() {
            axios.get('http://localhost:8000/api/students')
                .then(response => {
                    this.students = response.data.students
                    console.log(this.students)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        deleteStudent(id) {
            if (confirm('Are you sure you want to delete this student?')) {
                this.deleting.push(id)
                axios.delete(`http://localhost:8000/api/students/${id}/delete`)
                    .then(response => {
                        alert(response.data.message)
                        this.getStudents()
                    })
                    .catch(error => {
                        console.log(error)
                        if (error.response.status === 404) {
                            alert(error.response.data.message)
                        }
                    })
                    .finally(() => {
                        this.deleting = this.deleting.filter(item => item !== id)
                    })
            }
        }
    }

}
</script>

<style></style>