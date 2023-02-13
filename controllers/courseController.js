const courseDal = require("../dal/courseDal");

class CourseController {

    getAllCourses = async (req, res) => {
        const courses = await courseDal.getAllCourses();
        if (!courses?.length)//איך יכול להיות null??
            return res.status(400).json({ message: 'No messages found' })
        res.json(courses);
    }
    
    createNewCourse = async (req, res) => {
        const content = req.body;
        const course = courseDal.createNewCourse(content);
        if (course)
            return res.status(201).json({ message: 'New course created' });
        return res.status(400);
    }


}

const courseController = new CourseController();

module.exports = courseController;