package com.example.crm.service;

import com.example.crm.dto.TaskDTO;
import com.example.crm.mapper.TaskMapper;
import com.example.crm.model.Task;
import com.example.crm.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskMapper taskMapper;

    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = taskMapper.toEntity(taskDTO);
        return taskMapper.toDto(taskRepository.save(task));
    }

    @Override
    public TaskDTO getTaskById(Long id) {
        Task task = taskRepository.findById(id).orElseThrow();
        return taskMapper.toDto(task);
    }

    @Override
    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDTO updateTask(Long id, TaskDTO taskDTO) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setDescription(taskDTO.getDescription());
        task.setDueDate(taskDTO.getDueDate());
        task.setStatus(taskDTO.getStatus());
        task.setPriority(taskDTO.getPriority());
        return taskMapper.toDto(taskRepository.save(task));
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public List<TaskDTO> getTasksByCustomerId(Long customerId) {
        return taskRepository.findByCustomer_Id(customerId).stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDTO> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status).stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDTO> searchByTitle(String query) {
        return taskRepository.searchByTitle(query).stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }
    // New filtering method
    /*public List<TaskDTO> filterTasks(Long customerId, String status, String priority, Long assignedUserId, Date dueDat) {
        return taskRepository.findAll().stream()
                .filter(task -> (customerId == null || task.getCustomer().getId().equals(customerId)) &&
                                (status == null || task.getStatus().equals(status)) &&
                                (priority == null || task.getPriority().equals(priority)) &&
                                (assignedUserId == null || task.getAssignedUser().getId().equals(assignedUserId)) &&
                                (dueDateFrom == null || !task.getDueDate().before(dueDateFrom)) &&
                                (dueDateTo == null || !task.getDueDate().after(dueDateTo)))
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }*/
}
