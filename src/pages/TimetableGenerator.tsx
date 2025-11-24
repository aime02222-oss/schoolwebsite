// src/pages/TimetableGenerator.js
import React, { useState, useEffect } from 'react';
import { 
  FaCog, 
  FaSync, 
  FaSave, 
  FaPrint, 
  FaEye, 
  FaEdit, 
  FaTrash,
  FaPlus,
  FaCalendarAlt,
  FaClock,
  FaUserTie,
  FaChalkboardTeacher,
  FaBuilding,
  FaSchool,
  FaGraduationCap,
  FaCogs,
  FaExclamationTriangle,
  FaCheckCircle
} from 'react-icons/fa';
import './TimetableGenerator.css';

const TimetableGenerator = () => {
  const [timetableData, setTimetableData] = useState({
    oLevel: [],
    tvet: []
  });
  const [constraints, setConstraints] = useState({
    maxPeriodsPerDay: 8,
    minBreaks: 2,
    teacherAvailability: {},
    roomAvailability: {}
  });
  const [generationStatus, setGenerationStatus] = useState('idle');
  const [selectedView, setSelectedView] = useState('oLevel');
  const [isGenerating, setIsGenerating] = useState(false);
  const [sampleData, setSampleData] = useState(null);

  // Load sample data from localStorage
  useEffect(() => {
    const loadSampleData = () => {
      const data = JSON.parse(localStorage.getItem('apaer_timetable_data') || 'null');
      setSampleData(data);
    };
    
    loadSampleData();
  }, []);

  // Generate timetable function
  const generateTimetable = async () => {
    if (!sampleData) return;
    
    setIsGenerating(true);
    setGenerationStatus('generating');

    try {
      // Simulate API call/processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate sample timetable data
      const generatedTimetable = generateSampleTimetable();
      
      setTimetableData(generatedTimetable);
      setGenerationStatus('success');
      
      // Save to localStorage
      const existingTimetables = JSON.parse(localStorage.getItem('apaer_timetables') || '[]');
      const newTimetable = {
        id: Date.now(),
        name: `Timetable ${new Date().toLocaleDateString()}`,
        data: generatedTimetable,
        generatedAt: new Date().toISOString(),
        type: 'auto-generated',
        status: 'draft'
      };
      
      existingTimetables.unshift(newTimetable);
      localStorage.setItem('apaer_timetables', JSON.stringify(existingTimetables));
      
    } catch (error) {
      console.error('Error generating timetable:', error);
      setGenerationStatus('error');
    } finally {
      setIsGenerating(false);
    }
  };

  // Enhanced timetable generation algorithm
  const generateSampleTimetable = () => {
    const oLevelTimetable = [];
    const tvetTimetable = [];

    // Generate O-Level timetable
    sampleData.classGroups
      .filter(group => group.type === 'o-level')
      .forEach(group => {
        const groupTimetable = {
          classGroup: group,
          schedule: {}
        };

        sampleData.days.forEach(day => {
          groupTimetable.schedule[day] = [];
          const usedTeachers = new Set();
          const usedRooms = new Set();

          sampleData.timeSlots.forEach(slot => {
            if (typeof slot.period === 'number') {
              // Get available subjects for this group
              const availableSubjects = sampleData.oLevelSubjects.filter(subject => 
                group.subjects.includes(subject.id)
              );

              // Find available teacher and room
              const availableSubject = availableSubjects.find(subject => 
                subject.teachers.some(teacherId => {
                  const teacher = sampleData.teachers.find(t => t.id === teacherId);
                  return teacher && !usedTeachers.has(teacherId);
                })
              );

              if (availableSubject) {
                const teacher = sampleData.teachers.find(t => 
                  availableSubject.teachers.includes(t.id) && !usedTeachers.has(t.id)
                );
                const room = sampleData.rooms.find(r => 
                  r.type === 'classroom' && !usedRooms.has(r.id)
                );

                if (teacher && room) {
                  usedTeachers.add(teacher.id);
                  usedRooms.add(room.id);

                  groupTimetable.schedule[day].push({
                    period: slot.period,
                    time: `${slot.start} - ${slot.end}`,
                    subject: availableSubject.name,
                    subjectCode: availableSubject.code,
                    teacher: teacher.name,
                    teacherId: teacher.id,
                    room: room.name,
                    roomId: room.id,
                    type: 'theory',
                    color: availableSubject.color
                  });
                }
              }
            } else {
              groupTimetable.schedule[day].push({
                period: slot.period,
                time: `${slot.start} - ${slot.end}`,
                subject: slot.period,
                teacher: '',
                room: '',
                type: 'break',
                color: '#FFA500'
              });
            }
          });
        });

        oLevelTimetable.push(groupTimetable);
      });

    // Generate TVET timetable
    sampleData.classGroups
      .filter(group => group.type === 'tvet')
      .forEach(group => {
        const groupTimetable = {
          classGroup: group,
          schedule: {}
        };

        sampleData.days.forEach(day => {
          groupTimetable.schedule[day] = [];
          let practicalScheduled = false;

          sampleData.timeSlots.forEach(slot => {
            if (typeof slot.period === 'number') {
              const module = sampleData.tvetModules.find(m => 
                group.modules.includes(m.id)
              );

              if (module) {
                const teacher = sampleData.teachers.find(t => 
                  module.teachers.includes(t.id)
                );

                let room;
                if (!practicalScheduled && slot.period >= 4) {
                  // Schedule practical session
                  room = sampleData.rooms.find(r => {
                    if (module.labRequired) return r.type === 'lab';
                    if (module.workshopRequired) return r.type === 'workshop';
                    return r.type === 'classroom';
                  });
                  practicalScheduled = true;
                } else {
                  room = sampleData.rooms.find(r => r.type === 'classroom');
                }

                groupTimetable.schedule[day].push({
                  period: slot.period,
                  time: `${slot.start} - ${slot.end}`,
                  subject: module.name,
                  subjectCode: module.code,
                  teacher: teacher?.name || 'TBA',
                  teacherId: teacher?.id,
                  room: room?.name || 'TBA',
                  roomId: room?.id,
                  type: practicalScheduled ? 'practical' : 'theory',
                  color: module.color
                });
              }
            } else {
              groupTimetable.schedule[day].push({
                period: slot.period,
                time: `${slot.start} - ${slot.end}`,
                subject: slot.period,
                teacher: '',
                room: '',
                type: 'break',
                color: '#FFA500'
              });
            }
          });
        });

        tvetTimetable.push(groupTimetable);
      });

    return { oLevel: oLevelTimetable, tvet: tvetTimetable };
  };

  // Save timetable
  const saveTimetable = () => {
    const existingTimetables = JSON.parse(localStorage.getItem('apaer_timetables') || '[]');
    const currentTimetable = existingTimetables[0]; // Get the latest generated timetable
    
    if (currentTimetable) {
      currentTimetable.status = 'published';
      currentTimetable.publishedAt = new Date().toISOString();
      localStorage.setItem('apaer_timetables', JSON.stringify(existingTimetables));
      alert('Timetable published successfully!');
    }
  };

  // Print timetable
  const printTimetable = () => {
    window.print();
  };

  if (!sampleData) {
    return (
      <div className="timetable-generator">
        <div className="loading-state">
          <FaSync className="spinning" />
          <h3>Loading timetable data...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="timetable-generator">
      {/* Header */}
      <div className="timetable-header">
        <div className="header-content">
          <FaCalendarAlt className="header-icon" />
          <div className="header-text">
            <h1>Timetable Generator</h1>
            <p>Generate and manage class schedules for O-Level and TVET programs</p>
          </div>
        </div>
        
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={generateTimetable}
            disabled={isGenerating}
          >
            <FaSync className={isGenerating ? 'spinning' : ''} />
            {isGenerating ? 'Generating...' : 'Generate Timetable'}
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={saveTimetable}
            disabled={timetableData.oLevel.length === 0}
          >
            <FaSave />
            Publish
          </button>
          
          <button 
            className="btn btn-outline"
            onClick={printTimetable}
            disabled={timetableData.oLevel.length === 0}
          >
            <FaPrint />
            Print
          </button>
        </div>
      </div>

      {/* Generation Status */}
      {generationStatus !== 'idle' && (
        <div className={`status-alert ${generationStatus}`}>
          {generationStatus === 'generating' && (
            <>
              <FaSync className="spinning" />
              Generating timetable... This may take a few seconds.
            </>
          )}
          {generationStatus === 'success' && (
            <>
              <FaCheckCircle />
              Timetable generated successfully! Review and publish when ready.
            </>
          )}
          {generationStatus === 'error' && (
            <>
              <FaExclamationTriangle />
              Error generating timetable. Please try again.
            </>
          )}
        </div>
      )}

      {/* Statistics */}
      <div className="timetable-stats">
        <div className="stat-card">
          <FaSchool />
          <div className="stat-info">
            <span className="stat-number">{sampleData.classGroups.filter(g => g.type === 'o-level').length}</span>
            <span className="stat-label">O-Level Classes</span>
          </div>
        </div>
        <div className="stat-card">
          <FaCogs />
          <div className="stat-info">
            <span className="stat-number">{sampleData.classGroups.filter(g => g.type === 'tvet').length}</span>
            <span className="stat-label">TVET Programs</span>
          </div>
        </div>
        <div className="stat-card">
          <FaChalkboardTeacher />
          <div className="stat-info">
            <span className="stat-number">{sampleData.teachers.length}</span>
            <span className="stat-label">Teachers</span>
          </div>
        </div>
        <div className="stat-card">
          <FaBuilding />
          <div className="stat-info">
            <span className="stat-number">{sampleData.rooms.length}</span>
            <span className="stat-label">Rooms</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="timetable-nav">
        <button 
          className={`nav-tab ${selectedView === 'oLevel' ? 'active' : ''}`}
          onClick={() => setSelectedView('oLevel')}
        >
          <FaGraduationCap />
          O-Level Classes
        </button>
        <button 
          className={`nav-tab ${selectedView === 'tvet' ? 'active' : ''}`}
          onClick={() => setSelectedView('tvet')}
        >
          <FaCogs />
          TVET Programs
        </button>
        <button 
          className={`nav-tab ${selectedView === 'constraints' ? 'active' : ''}`}
          onClick={() => setSelectedView('constraints')}
        >
          <FaCog />
          Constraints & Settings
        </button>
      </div>

      {/* Main Content */}
      <div className="timetable-content">
        {selectedView === 'oLevel' && (
          <TimetableView 
            data={timetableData.oLevel}
            type="o-level"
            timeSlots={sampleData.timeSlots}
            days={sampleData.days}
          />
        )}

        {selectedView === 'tvet' && (
          <TimetableView 
            data={timetableData.tvet}
            type="tvet"
            timeSlots={sampleData.timeSlots}
            days={sampleData.days}
          />
        )}

        {selectedView === 'constraints' && (
          <ConstraintsView 
            constraints={constraints}
            setConstraints={setConstraints}
            sampleData={sampleData}
          />
        )}
      </div>
    </div>
  );
};

// Timetable View Component
const TimetableView = ({ data, type, timeSlots, days }) => {
  if (data.length === 0) {
    return (
      <div className="empty-state">
        <FaCalendarAlt />
        <h3>No timetable generated yet</h3>
        <p>Click "Generate Timetable" to create a schedule for {type === 'o-level' ? 'O-Level classes' : 'TVET programs'}</p>
      </div>
    );
  }

  return (
    <div className="timetable-view">
      {data.map((classTimetable, index) => (
        <div key={index} className="class-timetable">
          <div className="class-header">
            <div className="class-info">
              <h3>{classTimetable.classGroup.name}</h3>
              <span className="class-details">
                {type === 'o-level' 
                  ? `Level: ${classTimetable.classGroup.level} | Stream: ${classTimetable.classGroup.stream}`
                  : `Program: ${classTimetable.classGroup.program} | Level: ${classTimetable.classGroup.level}`
                }
              </span>
            </div>
            <span className="class-type">
              {type === 'o-level' ? 'O-Level Class' : 'TVET Program'}
            </span>
          </div>
          
          <div className="timetable-table-container">
            <table className="timetable-table">
              <thead>
                <tr>
                  <th>Time</th>
                  {days.map(day => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(slot => (
                  <tr key={slot.id}>
                    <td className="time-slot">
                      <div className="period">{slot.period}</div>
                      <div className="time">{slot.start} - {slot.end}</div>
                    </td>
                    {days.map(day => {
                      const session = classTimetable.schedule[day]?.find(
                        s => s.period === slot.period
                      );
                      return (
                        <td key={day} className={`session ${session?.type || 'empty'}`}>
                          {session && session.type !== 'break' ? (
                            <div 
                              className="session-content"
                              style={{ borderLeftColor: session.color }}
                            >
                              <div className="subject">
                                <strong>{session.subjectCode}</strong>
                                <small>{session.subject}</small>
                              </div>
                              <div className="teacher">
                                <FaChalkboardTeacher />
                                {session.teacher}
                              </div>
                              <div className="room">
                                <FaBuilding />
                                {session.room}
                              </div>
                              {session.type === 'practical' && (
                                <span className="session-badge practical">Practical</span>
                              )}
                            </div>
                          ) : session?.type === 'break' ? (
                            <div className="break-session">
                              {session.subject}
                            </div>
                          ) : (
                            <div className="empty-session">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

// Constraints View Component
const ConstraintsView = ({ constraints, setConstraints, sampleData }) => {
  return (
    <div className="constraints-view">
      <div className="constraints-section">
        <h3>General Constraints</h3>
        <div className="constraints-grid">
          <div className="constraint-item">
            <label>Max Periods Per Day</label>
            <input 
              type="number" 
              value={constraints.maxPeriodsPerDay}
              onChange={(e) => setConstraints({
                ...constraints,
                maxPeriodsPerDay: parseInt(e.target.value)
              })}
              min="4"
              max="10"
            />
          </div>
          
          <div className="constraint-item">
            <label>Minimum Breaks</label>
            <input 
              type="number" 
              value={constraints.minBreaks}
              onChange={(e) => setConstraints({
                ...constraints,
                minBreaks: parseInt(e.target.value)
              })}
              min="1"
              max="4"
            />
          </div>
        </div>
      </div>

      <div className="constraints-section">
        <h3>Teacher Availability</h3>
        <div className="teachers-list">
          {sampleData.teachers.map(teacher => (
            <div key={teacher.id} className="teacher-constraint">
              <div className="teacher-info">
                <FaUserTie />
                <div>
                  <span>{teacher.name}</span>
                  <small>({teacher.type})</small>
                </div>
              </div>
              <select defaultValue={teacher.availability}>
                <option value="full-time">Full Time</option>
                <option value="part-time-morning">Part Time - Morning</option>
                <option value="part-time-afternoon">Part Time - Afternoon</option>
                <option value="not-available">Not Available</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="constraints-section">
        <h3>Room Availability</h3>
        <div className="rooms-list">
          {sampleData.rooms.map(room => (
            <div key={room.id} className="room-constraint">
              <div className="room-info">
                <FaBuilding />
                <div>
                  <span>{room.name}</span>
                  <small>({room.type}) - Capacity: {room.capacity}</small>
                </div>
              </div>
              <select defaultValue={room.available ? 'available' : 'maintenance'}>
                <option value="available">Available All Day</option>
                <option value="morning">Morning Only</option>
                <option value="afternoon">Afternoon Only</option>
                <option value="maintenance">Under Maintenance</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimetableGenerator;