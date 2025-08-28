package com.example.crm.service;

import com.example.crm.dto.TaskDTO;
import java.util.List;

public interface TaskService {
    TaskDTO createTask(TaskDTO taskDTO);
    TaskDTO getTaskById(Long id);
    List<TaskDTO> getAllTasks();
    TaskDTO updateTask(Long id, TaskDTO taskDTO);
    void deleteTask(Long id);

    List<TaskDTO> getTasksByCustomerId(Long customerId);
    List<TaskDTO> getTasksByStatus(String status);

    List<TaskDTO> searchByTitle(String query);
}