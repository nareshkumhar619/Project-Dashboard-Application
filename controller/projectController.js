import projects from "../model/projectsModel.js"

export const Projects = async (req, res) => {
    try {
        const tasks = await projects.find();
        res.json(tasks);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
