<script setup>
import { portfolioData } from './data/portfolioData'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import AwardSection from './components/AwardSection.vue'
import ProjectSection from './components/ProjectSection.vue'
import GameSection from './components/GameSection.vue'
import HardwareSection from './components/HardwareSection.vue'
import SkillSection from './components/SkillSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-pixel-bg text-pixel-textMain">
    <Navbar />
    
    <main class="flex-1">
      <HeroSection :profile="portfolioData.profile" />
      <AwardSection :awards="portfolioData.awards" />
      <ProjectSection :projects="portfolioData.projects" />
      <GameSection :games="portfolioData.games" />
      <HardwareSection :hardware="portfolioData.hardware" />
      <SkillSection :skills="portfolioData.skills" />
    </main>

    <FooterSection />
  </div>
</template>
