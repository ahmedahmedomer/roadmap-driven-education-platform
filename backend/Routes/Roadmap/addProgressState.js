const router = require("express").Router();
const pool = require("../../Database/db");
const authorization = require("../../middleware/authorization");

router.post("/student/state", authorization, async (req, res) => {
  try {
    const { topic_id, topic_level, state_id } = req.body;
    const studentId = req.user.userId;
    // Verify before adding(true or false)
    const verify = await pool.query(
      ` SELECT EXISTS (
        SELECT 1 FROM Progress_Status WHERE topic_id=$1 AND topic_level=$2 AND student_id=$3)`,
      [topic_id, topic_level, studentId]
    );
    // * Update state
    if(verify.rows[0].exists){
      try {
        const updateResponse = await pool.query(
          `UPDATE Progress_Status
             SET topic_id=$1, topic_level=$2, state_id=$4
             WHERE topic_id=$1 AND topic_level=$2 AND student_id=$3`,
          [topic_id, topic_level, studentId, state_id]
          
        );
        return res.status(200).json({ status: "success: topic was updated state" });
        
      } catch (error) {
            console.error(err);
            res
              .status(500)
              .json({ status: "error", message: "An error occurred" });
      }
    }
    
    const newRodmapInfo = await pool.query(
      "INSERT INTO Progress_Status (topic_id, topic_level, student_id,state_id) VALUES ($1, $2, $3,$4) ",
      [topic_id, topic_level, studentId, state_id]
    );

    res.status(200).json({ status: "success: topic was added state" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

// reset 
router.delete("/student/reset/:topicId/:level", authorization, async (req, res) => {
  try {
    const topic_id = req.params.topicId;
    const level=req.params.level;
    const studentId = req.user.userId;
    const newRodmapInfo = await pool.query(
      "DELETE FROM Progress_Status WHERE topic_id = $1 AND student_id = $2 AND topic_level=$3",
      [topic_id, studentId,level]
    );

    res.status(204).json({ status: "success: topic was reset" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

module.exports = router;

`roadmap=# SELECT * FROM Topic_States;
-[ RECORD 1 ]-----------
state_id   | 1
state_name | Not Started
-[ RECORD 2 ]-----------
state_id   | 2
state_name | In Progress
-[ RECORD 3 ]-----------
state_id   | 3
state_name | Completed`;