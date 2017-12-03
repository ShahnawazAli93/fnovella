package org.fnovella.project.group.controller;

import java.util.ArrayList;

import org.fnovella.project.group.model.Group;
import org.fnovella.project.group.repository.GroupRepository;
import org.fnovella.project.group.service.GroupService;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/group/")
public class GroupController {


	@Autowired
	private GroupRepository groupRepository;
	@Autowired
	private GroupService groupService;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.groupRepository.findAll(pageable), null);
	}

	@RequestMapping(value = "by-course/{course}", method = RequestMethod.GET)
	public APIResponse getGroupByCourse(@RequestHeader("authorization") String authorization, @PathVariable("course") Integer course , Pageable pageable) {

		return new APIResponse(this.groupRepository.findByCourseId(course, pageable), null);
	}

	@RequestMapping(value = "by-workshop/{workshop}", method = RequestMethod.GET)
	public APIResponse getGroupByWorkshop(@RequestHeader("authorization") String authorization, @PathVariable("workshop") Integer workshop , Pageable pageable) {

		return new APIResponse(this.groupRepository.findByWorkshopId(workshop, pageable), null);
	}

	@RequestMapping(value = "by-division/{division}", method = RequestMethod.GET)
	public APIResponse getGroupByDivision(@RequestHeader("authorization") String authorization, @PathVariable("division") Integer division , Pageable pageable) {

		return new APIResponse(this.groupRepository.findByDivisionId(division, pageable), null);
	}

	@RequestMapping(value = "by-section/{section}", method = RequestMethod.GET)
	public APIResponse getGroupBySection(@RequestHeader("authorization") String authorization, @PathVariable("section") Integer section , Pageable pageable) {

		return new APIResponse(this.groupRepository.findBySection(section, pageable), null);
	}

	@RequestMapping(value = "by-instructor/{instructor}", method = RequestMethod.GET)
	public APIResponse getGroupByInstructor(@RequestHeader("authorization") String authorization, @PathVariable("instructor") Integer instructor , Pageable pageable) {

		return new APIResponse(this.groupRepository.findByInstructor(instructor, pageable), null);
	}

	@RequestMapping(value = "delete/{id}/check", method = RequestMethod.GET)
	public APIResponse checkDeletion(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		Group group = this.groupRepository.findOne(id);
		return new APIResponse(group == null, null);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Group group = this.groupRepository.findOne(id);
		if (group != null) {
			return new APIResponse(group, null);
		}
		errors.add("Group doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody Group group) {
		ArrayList<String> errors = group.validate();
		if (errors.isEmpty()) {
			groupService.updateCategoryStructureAfterCreate(group);
			return new APIResponse(this.groupRepository.save(group), null);
		}
		return new APIResponse(null, errors);
	}


	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody Group group,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Group toUpdate = this.groupRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(group);
			return new APIResponse(this.groupRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Group doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Group group = this.groupRepository.findOne(id);
		if (group != null) {
			this.groupRepository.delete(group);
			this.groupService.updateCategoryStructureAfterDelete(group);
			return new APIResponse(true, null);
		}
		errors.add("Group doesn't exist");
		return new APIResponse(null, errors);
	}
	
}